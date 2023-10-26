import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoiceItems";
import Invoice from "../domain/invoice";
import Address from "../value-object/address";

describe("InvoiceRepository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a invoice", async () => {

        const invoiceItem1 = new InvoiceItems({
            id: new Id("1"),
            name: "Item 1",
            price: 15
        })
        
        const invoiceItem2 = new InvoiceItems({
            id: new Id("2"),
            name: "Item 2",
            price: 85
        })
        
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "37974943866",
            address: new Address({
                street: "Street 1",
                number: "1",
                complement: "Complement 1",
                city: "City 1",
                state: "SP",
                zipcode: "11111-111",
            }),
            items: [invoiceItem1, invoiceItem2],
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const repository = new InvoiceRepository();
        const generateInvoice = await repository.generate(invoice);

        expect(generateInvoice.id.id).toEqual("1"),
        expect(generateInvoice.items.length).toBe(2),
        expect(generateInvoice.name).toEqual(invoice.name);
    })

    it("should find a invoice", async () => {

        const invoiceItem1 = new InvoiceItems({
            id: new Id("1"),
            name: "Item 1",
            price: 15,
        })
        
        const invoiceItem2 = new InvoiceItems({
            id: new Id("2"),
            name: "Item 2",
            price: 85,
        })
                
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "37974943866",
            address: new Address({
                street: "Street 1",
                number: "1",
                complement: "Complement 1",
                city: "City 1",
                state: "SP",
                zipcode: "11111-111",
            }),
            items: [invoiceItem1, invoiceItem2],
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const repository = new InvoiceRepository();
        const generateInvoice = await repository.generate(invoice);

        const findInvoice = await repository.find(generateInvoice.id.id);

        expect(findInvoice.id.id).toEqual("1");
        expect(findInvoice.createdAt).toEqual(findInvoice.createdAt);
        expect(findInvoice.items.length).toBe(2);
    })
})