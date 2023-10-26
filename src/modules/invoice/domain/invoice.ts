import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import InvoiceItems from "./invoiceItems";

type InvoiceProps = {
    id?: Id // criado automaticamente
    name: string
    document: string
    address: Address;
    items: InvoiceItems[]
    createdAt?: Date
    updatedAt?: Date
};

export default class Invoice extends BaseEntity{

    private _name: string
    private _document: string
    private _address: Address; 
    private _items: InvoiceItems[]

    constructor(props: InvoiceProps){
        super(props.id, props.createdAt, props.updatedAt)
        this._name = props.name
        this._document = props.document
        this._address = props.address;
        this._items = props.items
    }    

    get name(): string{
        return this._name;
    }
    
    get document(): string{
        return this._document;
    }   
     
    get address(): Address {
        return this._address;
    }       

    get items(): InvoiceItems[]{
        return this._items;
    }       

    get total() {
        let total = 0;
        this._items.forEach((item) => {
          total = total + item.price;
        });
    
        return total;
      }    

}