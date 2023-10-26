import { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto }from "./invoice.dto";

export default interface InvoiceFacadeInterface {

    find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>;
    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
}