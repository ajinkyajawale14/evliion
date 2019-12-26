import React, { Component } from 'react';
import LoadingIndicator  from '../common/LoadingIndicator';
import './Payment.css';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import { Form, Button } from 'antd';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(nextProps) {
    }

    render() {
        function paymentImage(type) {
            switch (type) {
                case 'visa': return 'http://www.credit-card-logos.com/images/visa_credit-card-logos/visa_logo_8.gif';
                case 'mastercard': return 'http:///www.credit-card-logos.com/images/mastercard_credit-card-logos/mastercard_logo_8.gif';
                case 'discover': return 'http://www.credit-card-logos.com/images/discover_credit-card-logos/discover_network1.jpg';
                case 'amex': return 'http://www.credit-card-logos.com/images/american_express_credit-card-logos/american_express_logo_7.gif';
                default: return '';
            }
        }
    
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        return (
            this.props.isAuthenticated && this.props.currentUser ? (
                <div className="payment">
                    <div className="payment-types">
                        <h2>Select a payment method</h2>

                        <Form onSubmit={this.handleSubmit} className="payment-form">
                            <div className="payment-types">
                                {
                                    this.props.currentUser.paymentMethods.map(method => {
                                        return (<label htmlFor={method.id} key={method.id} className="payment-type">
                                            <input type="radio" name="payment" id={method.id} value={method.id} />    
                                            <div>
                                                {method.balance ? <div>Use your <strong>{method.balance} Pay balance</strong></div> : null}
                                                {method.title ? <div><strong>{method.title}</strong></div> : null}
                                                {method.name ? <div>{method.name}</div> : null}
                                                {method.expiration ? <div>Expires {method.expiration}</div> : null}
                                            </div>
                                            {paymentImage(method.type) ? <img alt={method.type + ' card'} src={paymentImage(method.type)}/> : null}
                                        </label>)
                                    })
                                }
                                <label htmlFor="new" className="payment-type">
                                    <input type="radio" name="payment" id="new" value="new" />
                                    <div>
                                        Add Debit/Credit/ATM Card
                                    </div>
                                </label>
                                <label htmlFor="new" className="payment-type">
                                    <input type="radio" name="payment" id="new" value="new" />
                                    <div>
                                        EMI Unavailable <a href="">why?</a>
                                    </div>
                                </label>
                            </div>
                            <Button size="large" type="primary" className="payment-button">PAY</Button>
                        </Form>
                    </div>
                </div>
            ): null
        );
    }
}

export default Payment;