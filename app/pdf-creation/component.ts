import { action } from '@ember/object';
import Component from '@glimmer/component';
import { PDFDocument } from 'pdf-lib';

interface PdfCreationArgs {}

export default class PdfCreation extends Component<PdfCreationArgs> {
  pdfElement!: HTMLIFrameElement;

  @action
  async generatePdf() {
    // PDF Creation
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText('You can create PDFs!');
    const pdfBytes = await pdfDoc.save();
    const pdfDataUri = await pdfDoc.saveAsBase64({dataUri: true})
    this.pdfElement.src = pdfDataUri;
  }

  @action
  pdfElementInserted(e: HTMLIFrameElement) {
    this.pdfElement = e;
  }
}
