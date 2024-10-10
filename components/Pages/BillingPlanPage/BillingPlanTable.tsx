import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AUTH_API } from '@/components/utils/serverURL';
import Card from '../../Card';

const BillingPlanTable: React.FC = () => {
    const toa = useTranslations('common');
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [isPaymentStatus, setIsPaymentStatus] = useState("")
  const cards = [
    { title: 'Try out Aiana', description: '', price:'0', features:['1 chatbot', '25 chat sessions/month', '50MB document storage','1 linked website', 'Tickets', 'Chat logs', 'Email notifications'] },
    { title: 'Essentials', description: 'For small businesses', price:'29', features:['1 chatbot', '25 chat sessions/month', '50MB document storage','3 linked website', 'Tickets', 'Chat logs', 'Email notifications']  },
    { title: 'Advanced', description: 'More of everything', price:'49' , features:['3 chatbot', '500 chat sessions/month', '250MB document storage','Up to 7 linked website', 'Tickets', 'Chat logs', 'Email notifications']  },
    { title: 'Enterprise', description: 'Tailored Solutions for Enterprises Seeking Unmatched Performance', price:'' , features:[]  },
  ];

  useEffect(()=>{
    setEmail(localStorage.getItem("email")!)
    if(localStorage.getItem("status") !== "active"){
      router.push("/pricing")
    }
  }, [])

  const handleSubscribeClick = async() => {
    const response = await fetch((`${AUTH_API.GET_UPGRADE_URL}`),{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        'ngrok-skip-brower-warning': "1",
      },
      body: JSON.stringify({email})
    });
    const data = await response.json();
    router.push(`${data.sessionId}`);
  }

  return (
    <div className='flex flex-col gap-3 h-full overflow-y-auto'>
        <div className="h-full overflow-y-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-4 items-center">
            
            {cards.map((card) => (
                <Card key={card.title} title={card.title} description={card.description} price={card.price} features={card.features}/>
            ))}         
        </div>
        <div className='flex items-center justify-center w-full'>
            <button type='button' className='bg-[#7412c4] rounded-md text-white w-full md:w-[500px]  h-[40px] text-[18px]' onClick={handleSubscribeClick}>{toa('Upgrade')}</button>
        </div>
    </div>
  );
};

export default BillingPlanTable;