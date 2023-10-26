import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";

describe("InvoiceFacade test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        await sequelize.addModels([InvoiceModel]);
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });    

    it("should generate a invoice", async () => {

        const invoiceRepository = new InvoiceRepository();
        const generateUseCase = new GenerateInvoiceUseCase(invoiceRepository);
        const invoiceFacade = new InvoiceFacade({
                addUseCase: generateUseCase,
                findUsecase: undefined,
        });         

        const invoice = {
            name: "Invoice 1",
            document: "37974943866", 
            street: "Street 1",
            number: "1",
            complement: "Complement 1",
            city: "City",
            state: "SP",
            zipcode: "11111-111",
            items: [{
                id: "1",
                name: "Item 1",
                price: 15,
            },
            {
                id: "2",
                name: "Item 2",
                price: 85,
            }],
        }

        const result = await invoiceFacade.generate(invoice);

        expect(result.id).toBeDefined();
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document);
        expect(result.street).toEqual(invoice.street)
        expect(result.number).toEqual(invoice.number)
        expect(result.complement).toEqual(invoice.complement)
        expect(result.city).toEqual(invoice.city)
        expect(result.state).toEqual(invoice.state)
        expect(result.zipcode).toEqual(invoice.zipcode)
        
        expect(result.items[0].id).toEqual(invoice.items[0].id);
        expect(result.items[0].name).toEqual(invoice.items[0].name);
        expect(result.items[0].price).toEqual(invoice.items[0].price);
        
        expect(result.items[1].id).toEqual(invoice.items[1].id);
        expect(result.items[1].name).toEqual(invoice.items[1].name);
        expect(result.items[1].price).toEqual(invoice.items[1].price);

        expect(result.total).toEqual(100);

    });

});    