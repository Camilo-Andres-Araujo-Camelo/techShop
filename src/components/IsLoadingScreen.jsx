import React from 'react';

const IsLoadingScreen = () => {
    return (
        <div className='spinner-overlay'>
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
    );
};

export default IsLoadingScreen;