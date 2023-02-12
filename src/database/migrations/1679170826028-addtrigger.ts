import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTrigger1679170826028 implements MigrationInterface {
  name = 'AddTrigger1679170826028';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE OR REPLACE FUNCTION update_product_stock_on_incoming()
          RETURNS TRIGGER AS $$
          BEGIN
            UPDATE products
            SET stock = stock + NEW.quantity
            WHERE productid = NEW.productid;
            RETURN NEW;
          END;
          $$ LANGUAGE plpgsql;
    
          CREATE TRIGGER update_product_stock_on_incoming_trigger
          AFTER INSERT ON incomings
          FOR EACH ROW
          EXECUTE FUNCTION update_product_stock_on_incoming();
    
          CREATE OR REPLACE FUNCTION update_product_stock_on_outgoing()
          RETURNS TRIGGER AS $$
          BEGIN
            UPDATE products
            SET stock = stock - NEW.quantity
            WHERE productid = NEW.productid;
            RETURN NEW;
          END;
          $$ LANGUAGE plpgsql;
    
          CREATE TRIGGER update_product_stock_on_outgoing_trigger
          AFTER INSERT ON outgoings
          FOR EACH ROW
          EXECUTE FUNCTION update_product_stock_on_outgoing();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP TRIGGER IF EXISTS update_product_stock_on_incoming_trigger ON incomings;
          DROP FUNCTION IF EXISTS update_product_stock_on_incoming;
          DROP TRIGGER IF EXISTS update_product_stock_on_outgoing_trigger ON outgoings;
          DROP FUNCTION IF EXISTS update_product_stock_on_outgoing;
        `);
  }
}
