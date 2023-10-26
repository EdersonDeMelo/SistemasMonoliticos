import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoiceItems";
import Address from "../../value-object/address";
import FindInvoiceUseCase from "./find-invoice.usecase";


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

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    }
}

describe("Find a invoice use case unit test", () =>{
    it("should find a invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new FindInvoiceUseCase(invoiceRepository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(result.id).toBeDefined;
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.address.street).toEqual(invoice.address.street);
        expect(result.address.number).toEqual(invoice.address.number);
        expect(result.address.complement).toEqual(invoice.address.complement);
        expect(result.address.city).toEqual(invoice.address.city);
        expect(result.address.state).toEqual(invoice.address.state);
        expect(result.address.zipcode).toEqual(invoice.address.zipcode);
        expect(result.items[0].id).toEqual(invoice.items[0].id.id);
        expect(result.items[0].name).toEqual(invoice.items[0].name);
        expect(result.items[0].price).toEqual(invoice.items[0].price);
        expect(result.items[1].id).toEqual(invoice.items[1].id.id);
        expect(result.items[1].name).toEqual(invoice.items[1].name);
        expect(result.items[1].price).toEqual(invoice.items[1].price);   
        expect(result.total).toEqual(100);   
    });
});