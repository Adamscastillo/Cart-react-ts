import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/CartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
};

export function StoreItem({
  id,
  name,
  price,
  oldPrice,
  image,
}: StoreItemProps) {
  const {
    getItemQuantity,
    incrementCartQuantity,
    decrementCartQuantity,
    removeItemQuantity,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        className="h-100"
        variant="top"
        src={image}
        height="250px"
        style={{ objectFit: "cover", width: '25rem'}}
      />
      <Card.Body className="d-flex  flex-column" />
      <Card.Title className="d-flex mb-4 flex-column align-items-center" style={{ gap: ".5rem" }}>
        <span className="fs-5">{name}</span>
        <span className="ms-2 text-muted"> <del>de {formatCurrency(oldPrice)}</del> </span>
        <span className="shadow p-3 mb-5 bg-body rounded" > Por apenas {formatCurrency(price)}</span>
        <div className="mt-auto d-grid gap-2 col-4 mx-auto ">
          {quantity === 0 ? (
            <Button
              className="d-flex align-items-center flex-column" type="button"
              onClick={() => incrementCartQuantity(id)}
            >
              COMPRAR
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".4rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decrementCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3 align-items-center">{quantity}</span>
                  <span className="fs-3 align-items-center">und</span>
                </div>
                <Button onClick={() => incrementCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeItemQuantity(id)}
                variant="danger"
                size="sm"
              >
                Remover Item
              </Button>
            </div>
          )}
        </div>
      </Card.Title>
    </Card>
  );
}
