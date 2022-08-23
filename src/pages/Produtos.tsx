import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import products from "../data/items.json";

export function Produtos() {
  return (
    <>
      <p className="text-center fs-3 p-4 ">
        Promoções Imperdíveis de Tênis Maculino.
      </p>
      <Row md={2} xs={1} lg={3} className="g-4">
        {products.map((item) => (
          <Col keu={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
