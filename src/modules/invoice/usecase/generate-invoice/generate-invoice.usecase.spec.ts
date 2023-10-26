import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
      generate: jest.fn(),
      find: jest.fn(),
    };
  };

  describe("Generate Invoice usecase unit test", () => {
    it("should add a product", async () => {
      const invoiceRepository = MockRepository();
      const usecase = new GenerateInvoiceUseCase(invoiceRepository);
  
      const input = {
        id: "1",
        name: "Invoice 1",
        document: "37974943866",
        street: "Street1",
        number: "1",
        complement: "Complement 1",
        city: "City 1",
        state: "SP",
        zipcode: "11111-11",
        items: [{
            id: "1",
            name: "Item 1",
            price: 15
        },
        {
            id: "2",
            name: "Item 2",
            price: 85
        }]
    }
  
      const result = await usecase.execute(input);
  
      expect(invoiceRepository.generate).toHaveBeenCalled();
      expect(result.id).toBeDefined;
      expect(result.name).toEqual(input.name);
      expect(result.document).toEqual(input.document);
      expect(result.street).toEqual(input.street);
      expect(result.number).toEqual(input.number);
      expect(result.complement).toEqual(input.complement);
      expect(result.city).toEqual(input.city);
      expect(result.state).toEqual(input.state);
      expect(result.zipcode).toEqual(input.zipcode);
      expect(result.items[0].id).toEqual(input.items[0].id);
      expect(result.items[0].name).toEqual(input.items[0].name);
      expect(result.items[0].price).toEqual(input.items[0].price);
      expect(result.items[1].id).toEqual(input.items[1].id);
      expect(result.items[1].name).toEqual(input.items[1].name);
      expect(result.items[1].price).toEqual(input.items[1].price);    

    });
  });