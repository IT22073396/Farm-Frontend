import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  // Common styles
  page: {
    padding: 0,
    backgroundColor: '#f8fafc',
    fontFamily: 'Helvetica',
  },

  // First Page (Cover) Styles with single-line title and adjusted margins
  firstPage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 40, // Adjusted padding
  },
  coverContainer: {
    backgroundColor: '#1e3a8a',
    margin: 20, // Reduced margin
    borderRadius: 16,
    padding: 40,
    width: '90%', // Wider container
    minHeight: '85%', // Adjusted height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 6px 25px rgba(0,0,0,0.15)',
    border: '2px solid rgba(255,255,255,0.15)',
  },
  titleContainer: {
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'black',
    color: 'white',
    textAlign: 'center',
    lineHeight: 1.3,
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    lineHeight: 1.6,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  dateContainer: {
    marginTop: 30,
    padding: '15px 30px',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
  coverFooter: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  // Product Page Styles (unchanged)
  productContainer: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 35,
    minHeight: '85%',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    position: 'relative',
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 5,
    height: '100%',
    backgroundColor: '#1e3a8a',
  },
  productHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    paddingLeft: 15,
    borderLeft: '3px solid #1e3a8a',
  },
  subheader: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 25,
    paddingLeft: 18,
  },
  imageContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 15,
    marginBottom: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 220,
    border: '1px dashed #d1d5db',
  },
  productImage: {
    maxWidth: '80%',
    maxHeight: 180,
    objectFit: 'contain',
    filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.1))',
  },
  noImage: {
    color: '#9ca3af',
    fontSize: 13,
    fontStyle: 'italic',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
  },
  detailBox: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 18,
    border: '1px solid #e5e7eb',
  },
  detailLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 6,
    fontWeight: 'semibold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: 'bold',
  },
  priceValue: {
    color: '#1e3a8a',
    fontSize: 18,
  },
  descriptionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    border: '1px solid #f3f4f6',
  },
  descriptionLabel: {
    fontSize: 13,
    color: '#4b5563',
    marginBottom: 12,
    fontWeight: 'semibold',
  },
  descriptionText: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#374151',
  },
  brandTag: {
    position: 'absolute',
    top: 30,
    right: 30,
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '6px 18px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(30,58,138,0.2)',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#9ca3af',
  },
  watermark: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    fontSize: 60,
    color: 'rgba(243,244,246,0.5)',
    fontWeight: 'bold',
    transform: 'rotate(-30deg)',
  },
});

const formatDate = () => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const ProductPDFReport = ({ products }) => (
  <Document>
    {/* First Page - Cover with single-line title and adjusted margins */}
    <Page size="A4" style={styles.page}>
      <View style={styles.firstPage}>
        <View style={styles.coverContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>PRODUCT INVENTORY REPORT</Text>
          </View>
          
          <Text style={styles.subtitle}>
            Comprehensive Product Catalog
            {"\n"}
            & Stock Management System
          </Text>
          
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              Generated on: {formatDate()}
            </Text>
          </View>
          
          <Text style={styles.coverFooter}>
            © {new Date().getFullYear()} Your Company • CONFIDENTIAL
          </Text>
        </View>
      </View>
    </Page>

    {/* Product Pages */}
    {products.map((product, index) => (
      <Page key={product._id} size="A4" style={styles.page}>
        <View style={styles.productContainer}>
          <View style={styles.accentBar} />
          
          {product.brand && (
            <Text style={styles.brandTag}>{product.brand.toUpperCase()}</Text>
          )}
          
          <Text style={styles.productHeader}>{product.name}</Text>
          <Text style={styles.subheader}>Product ID: {product.productId}</Text>
          
          <View style={styles.imageContainer}>
            {product.imageUrl ? (
              <Image 
                src={`http://localhost:4000/${product.imageUrl}`}
                style={styles.productImage}
              />
            ) : (
              <Text style={styles.noImage}>No product image available</Text>
            )}
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Available Stock</Text>
              <Text style={styles.detailValue}>{product.quantity} units</Text>
            </View>
            
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Price</Text>
              <Text style={[styles.detailValue, styles.priceValue]}>
                LKR {Number(product.price).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </Text>
            </View>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>PRODUCT DESCRIPTION</Text>
            <Text style={styles.descriptionText}>
              {product.description || 'No detailed description available for this product.'}
            </Text>
          </View>
          
          <Text style={styles.watermark}>PRODUCT</Text>
        </View>
        
        <Text style={styles.footer}>
          Page {index + 2} of {products.length + 1}
        </Text>
      </Page>
    ))}
  </Document>
);

export default ProductPDFReport;