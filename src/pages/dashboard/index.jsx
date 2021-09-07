import React, { useState, useEffect } from "react"
import { Layout } from "antd"

import { useRequestRecommendations } from "../../utils/actions/dashboard"
import { HSTable } from "../../components/hstable"

import logo from "../../assets/logo-inline.svg"

const { Header, Content } = Layout

localStorage.setItem("recommendations_data", JSON.stringify({}))

export default function Dashboard() {
    const [commodityList, setCommodityList] = useState([])
    const [requestRecommendations] = useRequestRecommendations()

    const handleFindRecommendations = async ({ text }) => {
        const formData = new FormData()
        formData.append("text", text)

        await requestRecommendations(formData)

        var result = JSON.parse(localStorage.getItem("recommendations_data"))
        if (result) setCommodityList(result)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => handleFindRecommendations({ text: "linen" }), [])

    return (
        <Layout className="ctnr-hs-input" style={{ backgroundColor: "#FFF" }}>
            <Header>
                <img src={logo} alt="logo-hakovo" style={{display: "inline-block"}} />
            </Header>
            <Content style={{ padding: "0 50px" }}>
                <div className="site-layout-content">
                    <HSTable commodityList={commodityList} />
                </div>
            </Content>
        </Layout>
    )
}
