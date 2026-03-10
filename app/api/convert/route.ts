import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink, mkdir } from 'fs/promises'
import { join } from 'path'
import os from 'os'
import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs'

// NOTE: ILovePDFFile is not strictly needed and can be omitted
// import ILovePDFFile from '@ilovepdf/ilovepdf-nodejs/ILovePDFFile' 

// Set config for Next.js to disable body parsing, allowing request.formData()
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: NextRequest) {
    console.log("Conversion request received (ILovePDF)");

    // 1. Retrieve the keys from environment variables
    const secretKey = process.env.ILOVEPDF_SECRET_KEY
    const publicKey = process.env.ILOVEPDF_PUBLIC_KEY

    // 2. Validate both keys are present (Crucial for Vercel deployment)
    if (!secretKey || !publicKey) {
        return NextResponse.json({
            error: "Server configuration error: Both ILOVEPDF_PUBLIC_KEY and SECRET_KEY must be set in your environment."
        }, { status: 500 })
    }

    // 3. Initialize SDK CORRECTLY
    const instance = new ILovePDFApi(publicKey, secretKey);

    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const type = data.get('type') as string // 'pdf-to-word' or 'word-to-pdf'

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }
    if (type !== 'pdf-to-word' && type !== 'word-to-pdf') {
        return NextResponse.json({ error: "Invalid conversion type provided." }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Setup temporary paths in Vercel's writable directory
    const tempDir = join(os.tmpdir(), 'next-pdf-tools-ilove')
    await mkdir(tempDir, { recursive: true })

    const uniqueId = Date.now().toString()
    const inputPath = join(tempDir, `${uniqueId}_${file.name}`)

    // Determine conversion details
    const taskType = type === 'pdf-to-word' ? 'pdfword' : 'officepdf'
    const outputExt = type === 'pdf-to-word' ? 'docx' : 'pdf'

    try {
        await writeFile(inputPath, buffer)
        console.log(`Saved input to: ${inputPath}`)

        const task = instance.newTask(taskType as any)

        await task.start()
        await task.addFile(inputPath)
        await task.process()

        // This returns a Uint8Array, which is the source of the type error.
        const downloadData = await task.download()

        // FIX: Convert the downloaded Uint8Array data to a Node.js Buffer.
        // This makes it compatible with the NextResponse constructor's BodyInit type.
        const downloadBuffer = Buffer.from(downloadData);

        // Cleanup local temporary file immediately
        await unlink(inputPath).catch((e) => console.warn(`Failed to cleanup temp file: ${e.message}`))

        const mimeType = type === 'pdf-to-word'
            ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            : 'application/pdf'

        // Return the file stream/buffer
        return new NextResponse(downloadBuffer, {
            headers: {
                'Content-Disposition': `attachment; filename="${file.name.split('.')[0]}_converted.${outputExt}"`,
                'Content-Type': mimeType,
            }
        })

    } catch (error: any) {
        // Log detailed error from the SDK
        console.error("ILovePDF SDK Error:", error.message || error);

        // Attempt cleanup if the file was written
        await unlink(inputPath).catch(() => { })

        let errorDetails = "Unknown API error.";
        if (error.response?.data?.error) {
            errorDetails = `API Error: ${error.response.data.error_description || error.response.data.error}`;
        } else if (error.message) {
            errorDetails = error.message;
        }

        return NextResponse.json({
            error: "Conversion failed via ILovePDF. Check file size/type or API quota.",
            details: errorDetails
        }, { status: 500 })
    }
}