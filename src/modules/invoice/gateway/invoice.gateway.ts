import Invoice from "../domain/invoice";

export default interface InvoiceGateway {
  generate(product: Invoice): Promise<Invoice>;
  find(id: string): Promise<Invoice>;
}
