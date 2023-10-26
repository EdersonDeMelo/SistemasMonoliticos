import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.dto";
import InvoiceFacadeInterface from "./invoice.facade.interface";

export interface UseCasesProps{
    addUseCase: UseCaseInterface;
    findUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface{

    private _generateUsecase: UseCaseInterface;
    private _findUsecase: UseCaseInterface;

    constructor(usecasesPropos: UseCasesProps) {
        this._generateUsecase = usecasesPropos.addUseCase;
        this._findUsecase = usecasesPropos.findUsecase;
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateUsecase.execute(input);
    }

    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._findUsecase.execute(input);
    }
}