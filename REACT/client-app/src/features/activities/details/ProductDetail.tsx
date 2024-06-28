import React, { useEffect } from "react";
import { CardHeader, Button, Segment, FormField, Image } from 'semantic-ui-react';
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";

export default observer(function ProductDetails() {
    const { productStore } = useStore();
    const navigate = useNavigate();
    const { selectedProduct: product, loadProducts, deleteProduct, isUsedProduct, isused } = productStore;
    const { id } = useParams();
    function handleProductDelete(id: string) {
        deleteProduct(id).then(() => navigate('/product'));
    }

    useEffect(() => {
        if (id) {
            loadProducts(id)
            isUsedProduct(id)
        }
    }, [id, loadProducts, isUsedProduct])

    if (!product) return null;
    return (
        <>
            <Segment clearing color={"blue"}>
                <FormField>
                    <strong>Tên mặt phẩm:</strong>
                    <CardHeader>{product.productName}</CardHeader>
                </FormField>
                <br />
                <FormField>
                    <strong>Mô tả:</strong>
                    <CardHeader>{product.productDescription}</CardHeader>
                </FormField>
                <br />
                <FormField>
                    <strong>Đơn vị:</strong>
                    <CardHeader>{product.unit}</CardHeader>
                </FormField>
                <br />
                <FormField>
                    <strong>Email:</strong>
                    <CardHeader>{product.price}</CardHeader>
                </FormField>

                <br />
                <FormField>
                    <strong>Trạng thái:</strong>
                    {product.isSelling === true ? (

                        <p>Hiện còn bán</p>

                    ) : (

                        <p>Ngưng bán</p>

                    )}
                </FormField>
                <br />
                <FormField>
                    <strong>Ảnh:</strong>
                    <Image src={product.photo} size='small' />
                </FormField>
                {isused !== undefined &&
                    (!isused) && (
                        <Button floated="right" color='red' type="submit" content="Xóa" onClick={(e) => handleProductDelete(product.id)} />
                    )
                }
                <Button floated="right" type='button' content='Quay lại' as={Link} to={'/product'} />
            </Segment>
        </>
    );
})
