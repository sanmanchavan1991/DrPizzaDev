import React, {useState} from 'react';

const ConfirmMsg = (props) => {

    return (
                <>
                    {
                        props.checkBool ? (
                            <div className="container" style={{padding: '30px 0'}}>
                                <div className="row">
                                    <div className="col"></div>
                                    <div className="col-12">
                                        <div class="alert alert-success" role="alert">
                                            Success. Food item has been saved.
                                        </div>
                                    </div>
                                    <div className="col"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="container" style={{padding: '30px 0'}}>
                                <div className="row">
                                    <div className="col"></div>
                                    <div className="col-12">
                                        <div class="alert alert-danger" role="alert">
                                            Something went wrong. Food item has not been saved.
                                        </div>
                                    </div>
                                    <div className="col"></div>
                                </div>
                            </div>
                        )
                    }
                
                </>
    )

};
export default ConfirmMsg;