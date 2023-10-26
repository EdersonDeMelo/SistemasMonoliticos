import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItems from "../domain/invoiceItems";
import InvoiceGateway from "../gateway/invoice.gateway";
import Address from "../value-object/address";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(input: Invoice): Promise<Invoice> {

    const invoice = await InvoiceModel.create({
        id: input.id.id,
        name: input.name,
        document: input.document,
        street: input.address.street,
        number: input.address.number,
        complement: input.address.complement,
        city: input.address.city,
        state: input.address.state,
        zipcode: input.address.zipcode,        
        createdAt: input.createdAt,
        updatedAt: input.updatedAt,
        items: input.items.map((item) =>
            new InvoiceItems({
                id: item.id,
                name: item.name,
                price: item.price,
            })
        )
    });

    return new Invoice({
        id: new Id(invoice.id), 
        name: invoice.name,
        document: invoice.document,
        address: input.address, 
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
        items: input.items.map((item) => {
            return new InvoiceItems({
                id: item.id,
                name: item.name,
                price: item.price,
            })
        })
    })
  }

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({ where: { id } });

    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }
    const address = new Address({
      street: invoice.street,
      number: invoice.number,
      complement: invoice.complement,
      city: invoice.city,
      state: invoice.state,
      zipcode: invoice.zipcode
  });

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: address, 
      items: invoice.items.map((item) => {
        return new InvoiceItems({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
        })
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.createdAt
    });
  }
}
