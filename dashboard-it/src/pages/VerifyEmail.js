import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { Button, Result, Skeleton } from 'antd'

import 'antd/dist/antd.css'

const VerifyEmail = () => {
    const {search} = useLocation()
    const [isVerify, setIsVerify] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        search && getVerifyEmail()
    }, [search])

    const getVerifyEmail = async () => {
        setLoading(true)
        try {
            const id = search.split('=')[1]
            await axios.get('http://localhost:5000/verifycomplete', {
                params: {
                    status:id
                }
            })
            setIsVerify(true)
        } catch (e) {
            // console.log(e);
            setIsVerify(false)
        }
        setLoading(false)
    }

    return (
        <>
            {loading ?
                <Skeleton/>
                :
                <Result
                    status={isVerify ? 'success' : 'error'}
                    title={`${isVerify ? 'Successfully' : 'Error To'} Verify Your Email`}
                    subTitle={isVerify ?
                        'Your email has been successful verify. You can close this tab safety'
                        :
                        'Error to verify your email. Please contact Support Team or get new verify email.'
                    }
                    extra={
                        <Link to="/">
                            <Button type="primary" size="large" shape="round">
                                GO TO WEBSITE
                            </Button>
                        </Link>
                    }
                />
            }
        </>
    )

}
export default VerifyEmail
