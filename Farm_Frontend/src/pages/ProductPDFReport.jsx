import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        textDecoration: 'underline',
    },
    productContainer: {
        marginBottom: 20,
        borderBottom: '1px solid #ccc',
        paddingBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productInfo: {
        fontSize: 12,
    },
    productImage: {
        width: '100px',
        height: 'auto',
        marginBottom: 10,
    },
});

// Create Document Component
const ProductPDFReport = ({ products }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Products Report</Text>
                {products.map((product) => (
                    <View key={product._id} style={styles.productContainer}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productInfo}><strong>Product ID:</strong> {product.productId}</Text>
                        <Text style={styles.productInfo}><strong>Quantity:</strong> {product.quantity}</Text>
                        <Text style={styles.productInfo}><strong>Price (Lkr):</strong> {product.price}</Text>
                        <Text style={styles.productInfo}><strong>Description:</strong> {product.description}</Text>
                        {product.imageUrl && (
                            <Image src={`http://localhost:4000/${product.imageUrl}`} style={styles.productImage} />
                        )}
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default ProductPDFReport;
