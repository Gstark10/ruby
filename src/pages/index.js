import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import { client } from '../../lib/client';

import { Product, FooterBanner,HeroBanner } from "../../components";
import { images } from '../../next.config';



const Home = ({ products, bannerData }) => {
  return(
    <div>
      <HeroBanner  heroBanner={bannerData.length && bannerData[0]}/>
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers and Watches of many variations packages</p>
      </div>

      <div className='products-container'>
        {products?.map((product)=> <Product key ={product._id} product ={product}/>)}
      </div>

      {/* <div className='tech-container'>
       <img src="/images/headphones.jg" alt="Beats"></img>
      </div> */}

      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </div>
  )
};



export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return{
    props: { products, bannerData}
  }
}

export default Home;

<script src="https://www.paypal.com/sdk/js?client-id= AZcS3Sc4lK1Rnx6GG_kvtKHZ7icX_spJ3ztCbgkLFfWlimnFrZGS0ACUbwRBV8wCf2LRHmFs-BoSFT75&currency=USD"></script>