import React, { ChangeEvent, useEffect, useState } from "react";
import { Segment, Form, Button, FormField, Dropdown, Radio } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../app/models/product";
import { ProductAddUpdate } from "../../../app/models/productAddUpdate";

export default observer(function ProductForm() {
    const { productStore, activityStore, supplierStore } = useStore();
    const { createProduct, updateProduct, loading, loadProducts } = productStore;
    const { loadActivities, activities } = activityStore;
    const { loadSupplier, suppliers } = supplierStore;
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputError, setInputError] = useState<string | null>(null);

    const pageSize = 100;

    const [product, setProduct] = useState<Product>({
        id: '',
        productName: '',
        productDescription: '',
        unit: '',
        price: 0,
        photo: '',
        isSelling: true,
        supplierID: '',
        categoryID: '',
    });

    const [productAddUpdate, setProductAddUpdate] = useState<ProductAddUpdate>({
        id: '',
        productName: '',
        productDescription: "",
        unit: '',
        price: 0,
        uploadFile: new File([], ''),
        isSelling: true,
        supplierID: '',
        categoryID: '',
    });


    const copyProductToProductAddUpdate = () => {
        const { id, productName, productDescription, unit, price, isSelling, supplierID, categoryID } = product;
        const newProductAddUpdate: ProductAddUpdate = {
            id,
            productName,
            productDescription,
            unit,
            price,
            uploadFile: productAddUpdate.uploadFile,
            isSelling,
            supplierID,
            categoryID
        };
        setProductAddUpdate(newProductAddUpdate);
    };

    useEffect(() => {
        if (id) loadProducts(id).then(product => setProduct(product!));
        loadActivities('', 1, pageSize);
        loadSupplier('', 1, pageSize);
    }, [id, loadProducts, loadActivities, loadSupplier]);

    useEffect(() => {
        if (inputError) {
            const timer = setTimeout(() => {
                setInputError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [inputError]);

    useEffect(() => {
        copyProductToProductAddUpdate();
    }, [product]);

    function handleSubmit() {
        if (!product.productDescription || !product.productName || !product.unit || !product.price || !product.supplierID || !product.categoryID) {
            setInputError("Nhập đầy đủ thông tin!");
            return;
        }
        if (!product.id) {
            createProduct(productAddUpdate).then(() => navigate('/product'))
        } else {
            updateProduct(productAddUpdate).then(() => navigate('/product'))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        if (name === 'uploadFile') {
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0];
                setProductAddUpdate({ ...productAddUpdate, uploadFile: file });
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setProduct({ ...product, photo: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                }

            }
        } else {
            setProduct({ ...product, [name]: value });
        }
    }

    return (
        <>

            <Segment clearing color={"blue"}>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                    <FormField>
                        <label>Tên mặt hàng:</label>
                    </FormField>
                    <Form.Input placeholder='Nhập tên mặt hàng'
                        value={product.productName}
                        name='productName'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Mô tả:</label>
                    </FormField>
                    <Form.Input placeholder='Nhập mô tả'
                        value={product.productDescription}
                        name='productDescription'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Đơn vị:</label>
                    </FormField>
                    <Form.Input placeholder='Nhập đơn vị'
                        value={product.unit}
                        name='unit'
                        onChange={handleInputChange} />
                    <FormField>
                        <label>Giá:</label>
                    </FormField>
                    <Form.Input placeholder='Nhập giá'
                        type="number"
                        value={product.price}
                        name='price'
                        onChange={handleInputChange} />

                    <FormField>
                        <label>Loại Hàng:</label>
                    </FormField>

                    <Dropdown
                        placeholder='Chọn loại hàng'
                        fluid
                        selection
                        options={activities.map(activitie => ({
                            key: activitie.id,
                            text: activitie.categoryName,
                            value: activitie.id
                        }))}
                        value={product.categoryID}
                        onChange={(e, data) => setProduct({ ...product, categoryID: data.value as string })}
                    />
                    <br />
                    <FormField>
                        <label>Nhà cung cấp:</label>
                    </FormField>
                    <Dropdown
                        placeholder='Chọn nhà cung cấp'
                        fluid
                        selection
                        options={suppliers.map(supplier => ({
                            key: supplier.id,
                            text: supplier.supplierName,
                            value: supplier.id
                        }))}
                        value={product.supplierID}
                        onChange={(e, data) => setProduct({ ...product, supplierID: data.value as string })}
                    />
                    <br />
                    <Radio
                        label='Hiện còn bán.'
                        name='radioGroup'
                        value='true'
                        checked={product.isSelling === true}
                        onChange={(e) => {
                            setProduct({ ...product, isSelling: true });
                        }}
                    /><samp> </samp>
                    <Radio
                        label='Ngừng bán.'
                        name='radioGroup'
                        value='false'
                        checked={product.isSelling === false}
                        onChange={(e) => {
                            setProduct({ ...product, isSelling: false });
                        }}
                    />

                    <br />


                    <FormField>
                        <label>Ảnh:</label>
                    </FormField>
                    <input type="file" name="uploadFile" onChange={handleInputChange} />
                    {product.photo && (

                        <img src={product.photo} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />

                    )}
                    <br />
                    {inputError && (
                        <p style={{ color: 'red' }}>{inputError}</p>
                    )}
                    <br />
                    <Button loading={loading} floated="right" positive type="submit" content="Lưu" />
                    <Button as={Link} to={'/product'} floated="right" type='button' content='Quay lại' />
                </Form>
            </Segment >
        </>
    );
});
