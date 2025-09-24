declare module 'pdf-parse' {
  interface PDFInfo {
    PDFFormatVersion: string
    IsAcroFormPresent: boolean
    IsXFAPresent: boolean
    // 必要に応じてフィールドを追加
    [key: string]: any
  }

  interface PDFMetadata {
    info: PDFInfo
    metadata: any
    version: string
  }

  interface PDFData {
    numpages: number
    numrender: number
    info: PDFInfo
    metadata: any
    version: string
    text: string
  }

  function pdf(
    dataBuffer: Buffer,
    options?: { max?: number }
  ): Promise<PDFData>

  export = pdf
}
