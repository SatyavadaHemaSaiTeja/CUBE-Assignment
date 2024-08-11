// src/pages/CustomerListPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, Customer, fetchCustomerImages } from '../services/api';
import { setCustomers } from '../redux/customerSlice';
import { RootState } from '../redux/store';
import CustomerCard from '../components/CustomerCard';
import CustomButton from '../components/CustomButton';
import Grid from '../components/Grid';

const CustomerListPage: React.FC = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customer.customers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage, setCustomersPerPage] = useState(0);
  const [customerImages, setCustomerImages] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateCustomersPerPage = () => {
      if (listRef.current) {
        const listHeight = listRef.current.clientHeight;
        const headerHeight = 0.05 * window.innerHeight;
        const footerHeight = 60; // Approximate height of pagination controls
        const availableHeight = listHeight - headerHeight - footerHeight;
        const cardHeight = 80; // Adjust based on actual card height
        const perPage = Math.floor(availableHeight / cardHeight);
        setCustomersPerPage(perPage);
      }
    };

    calculateCustomersPerPage();
    window.addEventListener('resize', calculateCustomersPerPage);
    return () => window.removeEventListener('resize', calculateCustomersPerPage);
  }, []);

  useEffect(() => {
    const fetchAndSetCustomers = async () => {
      const data = await fetchCustomers();
      dispatch(setCustomers(data));
    };

    fetchAndSetCustomers();
  }, [dispatch]);

  useEffect(() => {
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    setCurrentCustomers(customers.slice(indexOfFirstCustomer, indexOfLastCustomer));
  }, [currentPage, customersPerPage, customers]);

  useEffect(() => {
    if (selectedCustomer) {
      const fetchImages = async () => {
        const images = await fetchCustomerImages(selectedCustomer.name); 
        setCustomerImages(images);
      };

      fetchImages();
    }
  }, [selectedCustomer]);

  const [currentCustomers, setCurrentCustomers] = useState<Customer[]>([]);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Heading Section */}
      <div style={{ 
        width: '100%', 
        height: '5%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderBottom: '1px solid #ccc' 
      }}>
        <p>This Here is the Heading</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', flex: 1, height: '95%' }}>
        {/* Left Column - Customer List */}
        <div 
          ref={listRef} 
          style={{ 
            width: '30%', 
            display: 'flex', 
            flexDirection: 'column', 
            overflowY: 'auto',
            borderRight: '1px solid #ccc'
          }}
        >
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', height: '95%', overflowY: 'auto' }}>
            {currentCustomers.map((customer, index) => (
              <CustomerCard 
                key={index} 
                customer={customer} 
                onClick={() => setSelectedCustomer(customer)} 
                isSelected={selectedCustomer?.name === customer.name}
              />
            ))}
          </div>
          <div style={{ 
            padding: '10px', 
            textAlign: 'center', 
            height: '5%',
            borderTop: '1px solid #ccc', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
            <CustomButton 
              onClick={() => setCurrentPage(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              Previous
            </CustomButton>
            <span style={{ margin: '0 15px', fontSize: '14px', color: '#555' }}>
              {`Page ${currentPage} of ${totalPages}`}
            </span>
            <CustomButton 
              onClick={() => setCurrentPage(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              Next
            </CustomButton>
          </div>
        </div>

        {/* Right Column - Customer Details */}
        <div style={{ 
          width: '70%', 
          height:'100%',
          msOverflowY:'auto',
          paddingLeft: '20px', 
          borderLeft: '1px solid #ccc', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          overflowY: 'auto',
        }}>
          {selectedCustomer ? (
            <div style={{ textAlign: 'center', justifyItems:'center' }}>
              <h2>{selectedCustomer.name}</h2>
              <p>{selectedCustomer.description}</p>
              <Grid items={customerImages} columns={3} itemHeight={150} />
            </div>
          ) : (
            <p>Select a customer to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerListPage;
