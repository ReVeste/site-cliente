import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const Pagamento = () => {
    useEffect(() => {
      initMercadoPago('APP_USR-1dfce30a-2ce2-4bc7-ab7e-940f3cb99123', { locale: 'pt-BR' });
    }, []);

    return (
      <div>  
        <Wallet initialization={{ preferenceId: '1144315648-e0dcb106-faeb-4a24-9349-418d01570f97',  redirectMode: 'blank'  }} customization={{ texts:{ valueProp: 'smart_option'}}} />
      </div>
    );
};

export default Pagamento;