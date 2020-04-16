
export class Item {
  id: number;
  name: string;
}
export class EntityData {

  name: string;
  columns: any;
  entKeyField: string;
}

export class EntityVariablesItems {
  entityListItems: Item[];
  entityGridColumns: EntityData[] = [];
}

export const EntityVariables: EntityVariablesItems = { 
  entityListItems: 
   [
      { "id": 1, "name": "tbl_contacts" },
      { "id": 2, "name": "tblBook" },
      { "id": 3, "name": "tbl_employees" },
      { "id": 4, "name": "tbl_products" }

    ],

    entityGridColumns: [
      {
          "name": "tbl_contacts", 
          "columns": [
                        { key: 'id', title: 'ID' },
                        { key: 'name', title: 'Name' },
                        { key: 'email', title: 'Email' },
                        { key: 'phone', title: 'Phone' },
                        { key: 'url', title: 'Url' },
                      ],
          "entKeyField": "id"                                     
      }, 

      {
          "name": "tbl_employees", 
          "columns": [
                                    { key: 'id', title: 'ID' },
                                    { key: 'firstName', title: 'firstName' },
                                    { key: 'lastName', title: 'lastName' },
                                    { key: 'designation', title: 'designation' }
                     ],
          "entKeyField": "id"    
    },

      {
            "name": "tblBook", 
           "columns": [
                                    { key: 'id', title: 'ID' },
                                    { key: 'name', title: 'Name' },
                                    { key: 'authorName', title: 'AuthorName' },
                                    { key: 'publisherName', title: 'PublisherName' },
                                    { key: 'category', title: 'Category' }
                      ],
          "entKeyField": "id"  
      },

      {
            "name": "tbl_customers", 
            "columns": [
                                    { key: 'customerID', title: 'CustomerID' },
                                    { key: 'firstName', title: 'FirstName' },
                                    { key: 'lastName', title: 'LastName' },
                                    { key: 'companyName', title: 'CompanyName' },
                        ],
            "entKeyField": "customerID"  },
            {
              "name": "Product", 
              "columns": [
                                      { key: 'id', title: 'Id' },
                                      { key: 'name', title: 'Name' },
                                      { key: 'category', title: 'Category' },
                                      { key: 'price', title: 'Price' },
                          ],
              "entKeyField": "id"  },
              {
                "name": "tbl_products", 
                "columns": [
                                        { key: 'id', title: 'Id' },
                                        { key: 'name', title: 'Name' },
                                        { key: 'category', title: 'Category' },
                                        { key: 'price', title: 'Price' },
                            ],
                "entKeyField": "id"  }
    ]
};
