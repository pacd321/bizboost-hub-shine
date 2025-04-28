export interface ProductData {
    id: number;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    inStock: boolean;
    hidden: boolean;
  }
  
  export const parseCSV = (csvText: string): ProductData[] => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1)
      .filter(line => line.trim() !== '')
      .map((line, index) => {
        const values = line.split(',').map(value => value.trim());
        const product: ProductData = {
          id: index + 1, // Generate new IDs for imported products
          name: values[headers.indexOf('name')] || '',
          price: parseFloat(values[headers.indexOf('price')]) || 0,
          category: values[headers.indexOf('category')] || '',
          imageUrl: values[headers.indexOf('imageUrl')] || '',
          inStock: values[headers.indexOf('inStock')]?.toLowerCase() === 'true',
          hidden: false
        };
        return product;
      });
  };
  