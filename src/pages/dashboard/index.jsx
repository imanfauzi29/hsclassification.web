import React, {useState,useEffect} from "react";
import { Layout  } from 'antd';

import { useRequestRecommendations } from "../../utils/actions/dashboard";
import { HSTable } from "../../components/hstable";

const { Content } = Layout;

localStorage.setItem("recommendations_data",JSON.stringify({}));

export default function Dashboard(){

    const [commodityList,setCommodityList] = useState([]);
	const [requestRecommendations] = useRequestRecommendations();


    const handleFindRecommendations = ({text}) =>{
        const formData = new FormData();
        formData.append('text',text);

        requestRecommendations(formData);
        
        var result = JSON.parse(localStorage.getItem("recommendations_data"));
        if(result) setCommodityList(result);        
    }


    useEffect(()=> handleFindRecommendations('linen') ,[]);

    
    return (
        <Layout className="ctnr-hs-input" style={{backgroundColor:'#FFF'}}>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <HSTable commodityList/>
                </div>
            </Content>
        </Layout>
    );
}