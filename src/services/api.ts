
export interface Customer {
    name: string;
    description: string;
  }
  
  export const fetchCustomers = (): Customer[] => {
    const customers: Customer[] = Array.from({ length: 1100 }, (_, index) => ({
      name: `Customer ${index + 1}`,
      description: `Description for Customer ${index + 1} Usually, up and right should increase and left and down should decrease the value. If you apply -webkit-appearance you could prevent keyboard navigation for horizontal arrow keys for a truly vertical slider. This might be less confusing to users compared to a change in direction.`,
    }));
    return customers;
  };
  
  export const fetchCustomerImages = async (customerId: string): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150'
        ]);
      }, 500);
    });
  };