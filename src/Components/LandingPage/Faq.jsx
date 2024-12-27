import React from 'react'
import FaqText from './FaqText'
import FaqQuestion from './FaqQuestion'

function Faq() {
  return (
    <>
        <FaqText></FaqText>
    <div className='w-full min-h-[300px]  p-8 flex  flex-col items-center gap-6'>
            <FaqQuestion heading={'How do I list my property on the platform?'} 
                para={'To list your property, simply create an account, navigate to the "List Property" section, and fill out the required details, including photos, description, and rental terms.'}
            ></FaqQuestion>
            <FaqQuestion heading={'Are the properties verified before being listed?'} 
                para={'Yes, all properties go through a verification process to ensure they meet our quality and safety standards, providing peace of mind to tenants and landlords alike.'}
            ></FaqQuestion>

            <FaqQuestion heading={'Can I schedule a visit to the property before renting?'} 
                para={'Absolutely! You can contact the landlord or property manager through our platform to schedule a visit and clarify any questions you may have.'}
            ></FaqQuestion>

            <FaqQuestion heading={'Is customer support available if I face any issues?'} 
                para={'Yes, our customer support team is available 24/7 to assist with any questions or concerns regarding your rental journey.'}
            ></FaqQuestion>

    </div>
    </>
  )
}

export default Faq