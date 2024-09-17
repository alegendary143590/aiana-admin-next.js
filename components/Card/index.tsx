
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  price:string;
  features:string[];
}

const Card: React.FC<CardProps> = ({ title, description, price, features }) => {
    const router = useRouter()
    const [billingPlan, setBillingPlan] = useState("")
    useEffect(()=>{
        const plan = localStorage.getItem("plan");
        console.log(plan)
        if(plan) {
          if(plan==='aiana_try'){
            setBillingPlan('0')
          } else if(plan==='aiana_essentials'){
            setBillingPlan('29')
          } else if(plan==='aiana_advanced'){
            setBillingPlan('49')
          } else {
            setBillingPlan('')
          }
        } else {
          router.push("/signin")
        }
    }, [])

  return (
    <div className="relative bg-gray-100 shadow-md rounded-lg p-5 m-4 flex flex-col gap-3 pt-[50px] h-full pb-[100px]">
      {(billingPlan===price)&&(<div className='absolute top-0 -left-1 w-[100px] h-[40px] bg-blue-500 flex items-center justify-center text-white'>
            <p>Current Plan</p>
      </div>)}
      <div className='flex flex-col justify-between h-[180px]'>
        <div>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-400">{description}</p>
        </div>
        <div className='flex flex-col gap-2'>
            {price!==''&&(
                 <div className='flex flex-row items-center gap-2'>
                    <p className='text-[30px] font-semibold'>&euro;{price}</p>
                    <p className='text-gray-500 w-[10px] text-[12px]'>per month</p>
                </div>
            )}
        </div>
      </div>
      {features.length!==0&&(
        <div className='flex flex-col gap-2'>
            This includes:
            {features.map((item)=>(
                <div key={item.toString()} className='flex flex-row justify-start items-center text-[14px] gap-1'>
                    <Image src="/images/circle-check-solid.svg" alt="avatar" width={12} height={12} />
                    {item}
                </div>
            ))}
        </div>
      )}

    </div>
  );
};

export default Card;