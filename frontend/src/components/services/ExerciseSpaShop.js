import { Component } from "react";
import ProductList from "./ProductList";

export default class ExerciseSpaShop extends Component {

    products = [
        { id: 1, name: "Washing body", img: "./assets/imgs/washing.jpg", price: "150.000đ - 250.000đ", discription: "Bathing dogs, cats : Clean your pet's entire body", link: "/washingservice"},
        { id: 2, name: "Cut nails", img: "./assets/imgs/cut_nails.jpg", price: "30.000đ", discription: "Cut, trim hair and nails for dogs, cats: Trim your pet's nails and hair neatly",link: "/cutnailservice" },
        { id: 3, name: "Hair dye", img: "./assets/imgs/hair_dye.jpg", price: "100.000đ - 180.000đ", discription: "Dye hair for dogs, cats : Dye your pet's fur in your favorite color", link: "/hairdyeservice" },
        { id: 4, name: "Trim fur", img: "./assets/imgs/trim_hair.jpg", price: "280.000đ - 800.000đ", discription: "Grooming dogs, cats : Pet care, beauty, and relaxation services", link: "/trimfurservice"},
    ]
    combos = [
        { id: 1, name: "Combo 1: Bathing + Trim nails", img: "./assets/imgs/combo1.jpg", price: "Under 10KG - 10-15KG - Over 15KG : 160.000đ - 210.000đ - 250.000đ",link: "/booking"},
        { id: 2, name: "Combo 2: Bathing + Dye hair ", img: "./assets/imgs/combo2.jpg", price: "Under 10KG - 10-15KG - Over 15KG : 230.000đ - 310.000đ - 400.000đ",link: "/booking"},
        { id: 3, name: "Combo 3: Bathing + Grooming", img: "./assets/imgs/combo3.jpg", price: "Under 10KG - 10-15KG - Over 15KG : 170.000đ - 220.000đ - 260.000đ",link: "/booking"},
        { id: 4, name: "Combo 4: Trim nails + Dye hair ", img: "./assets/imgs/combo4.jpg", price: "Under 10KG - 10-15KG - Over 15KG : 120.000đ - 140.000đ - 200.000đ",link: "/booking"},
        { id: 5, name: "Combo 5: Bathing + Trim nails + Grooming", img: "./assets/imgs/combo5.jpg", price: "Under 10KG - 10-15KG - Over 15KG : 180.000đ - 230.000đ - 260.000đ",link: "/booking" },
        { id: 6, name: "Combo 6: Bathing + Trim fur + Dye hair ", img: "./assets/imgs/combo6.jpg", price: "Under 10KG - 10-15KG - Over 15KG : 500.000đ - 650.000đ - 1.200.000đ",link: "/booking"}
    ]

    render() {
        return (
            <div className="servicedetail">
                <h2 className="text-center p-4" style={{marginTop: '50px'}}>List Service Spa</h2>
                <div className="container-fluid">
                    <ProductList productData={this.products} />
                </div>
                <h2 className="text-center p-4" >List Combo Spa</h2>
                <div className="container-fluid">
                    <ProductList productData={this.combos} />
                </div>
            </div>
        );
    }
}