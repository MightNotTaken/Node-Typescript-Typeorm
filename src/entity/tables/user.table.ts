import { Table } from 'typeorm/schema-builder/table/Table';

export default new Table({
  name: 'user',
  columns: [
    {
      name: 'id',
      type: 'int',
      isNullable: false,
      isPrimary: true,
      isGenerated: true,
      generationStrategy: 'increment',
    },
    {
      name: 'name',
      type: 'varchar',
      length: '255',
      isNullable: false,
    },
    {
      name: 'username',
      type: 'varchar',
      length: '255',
      isNullable: false,
    },
    {
        name:'password', 
        type:'varchar', 
        length:'255',
        isNullable: false,
     },
  ],
});