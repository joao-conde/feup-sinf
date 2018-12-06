import { Product } from './../_models/product';
import { AdminConsult, TransformedLine } from './../_models/responses';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TokenRes, Order, OrderLine } from '@app/_models';

const CUST_ORDER_DATA: Order[] = [
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 24), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 25), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 26), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 20), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 30), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 20), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 20), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 20), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 20), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
  { supplier: 'SOFRIO', type: 'ECL', date: new Date(2018, 10, 20), content: [
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    },
    {
      name: 'example product',
      reference: 'Item code',
      quantity: 10,
      location: 'A1.1.10.14',
      warehouse: 'A1',
      stock: 10,
    }
  ]},
];

const SUP_ORDER_DATA: Order[] = [
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 24), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 25), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 26), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 20), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 30), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 20), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 20), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 20), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 20), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
    {
        supplier: 'SOFRIO', type: 'ECF', date: new Date(2018, 10, 20), content: [
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            },
            {
                name: 'example product',
                reference: 'Item code',
                quantity: 10,
                location: 'A1.1.10.14',
                warehouse: 'A1',
                stock: 10,
            }
        ]
    },
];

const ROUTE_ITEMS: Product[] = [
    {
        name: 'example product',
        reference: 'Item code',
        quantity: 10,
        location: 'A1.1.10.14',
        warehouse: 'A1',
        stock: 10,
    },
    {
        name: 'example product',
        reference: 'Item code',
        quantity: 10,
        location: 'A1.1.10.14',
        warehouse: 'A1',
        stock: 10,
    },
    {
        name: 'example product',
        reference: 'Item code',
        quantity: 10,
        location: 'A1.1.10.14',
        warehouse: 'A1',
        stock: 10,
    },
    {
        name: 'example product',
        reference: 'Item code',
        quantity: 10,
        location: 'A1.1.10.14',
        warehouse: 'A1',
        stock: 10,
    }
];

@Injectable({ providedIn: 'root' })
export class PrimaveraService {

    private currentTokenSubject: BehaviorSubject<TokenRes>;
    public currentToken: Observable<TokenRes>;

    constructor(private http: HttpClient) {
            this.currentTokenSubject = new BehaviorSubject<TokenRes>(JSON.parse(localStorage.getItem('currentToken')));
            this.currentToken = this.currentTokenSubject.asObservable();
    }

    public get currentTokenValue(): TokenRes {
        return this.currentTokenSubject.value;
    }

    async getToken() {
        const body = new URLSearchParams();
        body.append('username', 'FEUP'),
        body.append('password', 'qualquer1');
        body.append('company', 'DEMO');
        body.append('instance', 'DEFAULT');
        body.append('grant_type', 'password');
        body.append('line', 'professional');
        this.http.post<TokenRes>(`${environment.primaveraUrl}/token`, body.toString(), {}).subscribe((res) => {
            console.log(res);
            localStorage.setItem('currentToken', JSON.stringify(res));
            this.currentTokenSubject.next(res);
        }, (err) => {
            console.log('error:', err);
        });
    }

    getECL(): Observable<AdminConsult> {
        return <Observable<AdminConsult>>this.http.post(`${environment.primaveraUrl}/Administrador/Consulta`,
        `"SELECT Cab.Documento as type, Cab.Data as date, Cab.Entidade as supplier, Lin.Artigo as reference,
         Art.Descricao as name, Lin.Quantidade as quantity, Lin.Armazem as warehouse,
         Lin.Localizacao as location, ISNULL(Art.StkActual,0) as stock
         FROM CabecDoc as Cab join LinhasDoc as Lin on Cab.Id = Lin.IdCabecDoc join Artigo as Art on Lin.Artigo = Art.Artigo
          WHERE Cab.TipoDoc='ECL'"`
        , {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    getECF(): Observable<AdminConsult> {
        return <Observable<AdminConsult>>this.http.post(`${environment.primaveraUrl}/Administrador/Consulta`,
        `"SELECT Cab.Documento as type, Cab.Entidade as supplier, Cab.DataDoc as date,
        Lin.Artigo as reference, Art.Descricao as name, Lin.Quantidade as quantity,  Lin.Armazem as warehouse,
        Lin.Localizacao as location
        FROM CabecCompras as Cab join LinhasCompras as Lin on Cab.Id = Lin.IdCabecCompras join Artigo as Art on Lin.Artigo = Art.Artigo
        WHERE Cab.TipoDoc='ECF'"`
        , {
                headers: { 'Content-Type': 'application/json' }
        });
    }

    transformLines(lines: OrderLine[]): Promise<any>[] {
        // URL- {{apiUrl}}Vendas/Docs/AdicionaLinhaTransformada/{TipoDocEnc}/{NumDocEnc}/{NumLinEnc}/{FilialEnc}/{strSerieEnc}
        // Usage Example -
        // {{apiUrl}}Vendas/Docs/AdicionaLinhaTransformada/ECL/12/1/000/A
        // body: {
        //  "Tipodoc": "GR",
        //  "Serie": "A",
        //  "Entidade": "C0001",
        //  "TipoEntidade": "C",
        //  "DataDoc": "11/29/2018",
        //  "DataVenc": "11/29/2018"
        // }
        return [Promise.resolve()];
    }

    createDocument(lines: TransformedLine[]): Promise<any> {
        // URL for ECL - {{apiUrl}}Vendas/Docs/CreateDocument
        // URL for ECF - {{apiUrl}}Compras/Docs/CreateDocument
        // body - tranformed line received from transfomr lines request
        return Promise.resolve();
    }

    createRoute(items: Product[]): Observable<Product[]> {
        return of(ROUTE_ITEMS);
    }

    createTransfer() {
        // URL - {{apiUrl}}Inventario/Transferencias/CreateTransfer
        // body:  {
        //  "TipoDoc": "TRA",
        //  "Serie": "A",
        //  "Data": "29/11/2018",
        //  "Moeda": "EUR",
        //  "LinhasOrigem":
        //  [
        //      {
        //          "Artigo": "A0001",
        //          "Armazem": "A1",
        //          "Localizacao": "A1",
        //          "Lote": "",
        //          "Quantidade": 5,
        //          "PrecUnit": 1.5,
        //          "INV_EstadoOrigem": "DISP",
        //          "LinhasDestino":
        //              [
        //                  {
        //                      "Artigo": "A0001", "Armazem": "Arececao",
        //                      "Localizacao": "Arececao",
        //                      "Lote": "",
        //                      "Quantidade": 5,
        //                      "PrecUnit": 1.5,
        //                      "INV_EstadoDestino": "DISP"
        //                  }
        //              ]
        //      }
        //  ]
        // }
    }

    parseOrderLines(lines: OrderLine[]): Order[] {
        const orders: Order[] = [];
        lines.forEach((line) => {
            const number = line.type.slice(line.type.indexOf('/') + 1);
            if (orders[number]) {
                orders[number].content.push({
                    name: line.name,
                    reference: line.reference,
                    quantity: line.quantity,
                    warehouse: line.warehouse,
                    stock: line.stock,
                    location: line.location
                });
            } else {
                orders[number] = <Order>{
                    type: line.type,
                    supplier: line.supplier,
                    date: new Date(line.date),
                    content: [{
                        name: line.name,
                        reference: line.reference,
                        quantity: line.quantity,
                        warehouse: line.warehouse,
                        stock: line.stock,
                        location: line.location
                    }]
                };
            }
        });
        return orders;
    }
}
