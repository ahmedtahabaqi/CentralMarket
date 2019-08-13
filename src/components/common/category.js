import React from 'react';
import Context from '../Context';
import { NavLink } from 'react-router-dom';


class Category extends React.Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        return (<Context.Consumer>
            {ctx => {
                return (
                    <div>
                        {ctx.value.Lang === 'en' ? (
                            <div id='catgoryContiner'>
                                <div id='catgoryContiner1'>
                                    <div id='catgoryContiner2'>
                                        <NavLink to='/carforsale'>
                                            <article id='catgorycontentcard'>
                                                <div id='catgorycontentcardimg'>
                                                    <img width={48} height={48} src={require('../../assets/img/car.png')} alt='img' />
                                                </div>
                                                <p>Cars</p>
                                            </article>
                                        </NavLink>

                                        <NavLink to='/cargalleries'>
                                            <article id='catgorycontentcard'>

                                                <div id='catgorycontentcardimg'>
                                                    <img width={45} height={45} src={require('../../assets/img/gallery.png')} alt='img' />
                                                </div>

                                                <p>Galleries Car</p>
                                            </article>
                                        </NavLink>
                                    </div>
                                    <div id='catgoryContiner2'>
                                        <NavLink to='/SpareParts'>
                                            <article id='catgorycontentcard'>
                                                <div id='catgorycontentcardimg'>
                                                    <img width={45} height={45} src={require('../../assets/img/parts.png')} alt='img' />
                                                </div>
                                                <p>Spare Parts</p>
                                            </article>
                                        </NavLink>

                                        <NavLink to='/importedcars'>
                                            <article id='catgorycontentcard'>
                                                <div id='catgorycontentcardimg'>
                                                    <img width={50} height={50} src={require('../../assets/img/imported.png')} alt='img' />
                                                </div>
                                                <p>ِImported Cars</p>
                                            </article>
                                        </NavLink>
                                    </div>
                                </div>

                                <div id='catgoryContiner1'>
                                    <div id='catgoryContiner2'>
                                        <NavLink to='/carnumber'>
                                            <article id='catgorycontentcard'>
                                                <div id='catgorycontentcardimg'>
                                                    <img width={90} height={30} src={require('../../assets/img/carnumber.png')} alt='img' />
                                                </div>
                                                <p>Car numbers</p>
                                            </article>
                                        </NavLink>

                                        <NavLink to='/motorcycles'>
                                            <article id='catgorycontentcard'>
                                                <div id='catgorycontentcardimg'>
                                                    <img width={50} height={50} src={require('../../assets/img/motor-sports.svg')} alt='img' />
                                                </div>
                                                <p>Motorcycles</p>
                                            </article>
                                        </NavLink>
                                    </div>
                                    <div id='catgoryContiner2'>
                                        <NavLink to='/carforrent'>
                                            <article id='catgorycontentcard'>
                                                <div id='catgorycontentcardimg'>
                                                    <img width={50} height={50} src={require('../../assets/img/rent.png')} alt='img' />
                                                </div>
                                                <p>Cars for Rent</p>
                                            </article>
                                        </NavLink>

                                        <NavLink to={`/add?next=true`}>
                                            <article id='catgorycontentcard'>
                                                <div id='catgorycontentcardimg'>
                                                    <img width={40} height={40} src={require('../../assets/img/add.png')} alt='img' />
                                                </div>
                                                <p>ِAdd</p>
                                            </article>
                                        </NavLink>
                                    </div>
                                </div>

                            </div>
                        ) : (
                                <div id='catgoryContinerAr'>
                                    <div id='catgoryContiner1'>
                                        <div id='catgoryContiner2'>
                                            <NavLink to='/carforsale'>
                                                <article id='catgorycontentcard'>
                                                    <div id='catgorycontentcardimg'>
                                                        <img width={48} height={48} src={require('../../assets/img/car.png')} alt='img' />
                                                    </div>
                                                    <p>سيارات للبيع</p>
                                                </article>
                                            </NavLink>

                                            <NavLink to='/cargalleries'>
                                                <article id='catgorycontentcard'>

                                                    <div id='catgorycontentcardimg'>
                                                        <img width={45} height={45} src={require('../../assets/img/gallery.png')} alt='img' />
                                                    </div>

                                                    <p>معارض السيارات</p>
                                                </article>
                                            </NavLink>
                                        </div>
                                        <div id='catgoryContiner2'>
                                            <NavLink to='/SpareParts'>
                                                <article id='catgorycontentcard'>
                                                    <div id='catgorycontentcardimg'>
                                                        <img width={45} height={45} src={require('../../assets/img/parts.png')} alt='img' />
                                                    </div>
                                                    <p>قطع غيار</p>
                                                </article>
                                            </NavLink>

                                            <NavLink to='/importedcars'>
                                                <article id='catgorycontentcard'>
                                                    <div id='catgorycontentcardimg'>
                                                        <img width={50} height={50} src={require('../../assets/img/imported.png')} alt='img' />
                                                    </div>
                                                    <p>ِسيارات مستورده</p>
                                                </article>
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div id='catgoryContiner1'>
                                        <div id='catgoryContiner2'>
                                            <NavLink to='/carnumber'>
                                                <article id='catgorycontentcard'>
                                                    <div id='catgorycontentcardimg'>
                                                        <img width={90} height={30} src={require('../../assets/img/carnumber.png')} alt='img' />
                                                    </div>
                                                    <p>ارقام السيارات</p>
                                                </article>
                                            </NavLink>

                                            <NavLink to='/motorcycles'>
                                                <article id='catgorycontentcard'>
                                                    <div id='catgorycontentcardimg'>
                                                        <img width={50} height={50} src={require('../../assets/img/motor-sports.svg')} alt='img' />
                                                    </div>
                                                    <p>دراجات ناريه</p>
                                                </article>
                                            </NavLink>
                                        </div>
                                        <div id='catgoryContiner2'>
                                            <NavLink to='/carforrent'>
                                                <article id='catgorycontentcard'>
                                                    <div id='catgorycontentcardimg'>
                                                        <img width={50} height={50} src={require('../../assets/img/rent.png')} alt='img' />
                                                    </div>
                                                    <p>سيارات للايجار </p>
                                                </article>
                                            </NavLink>

                                            <NavLink to={`/add?next=true`}>
                                                <article id='catgorycontentcard'>
                                                    <div id='catgorycontentcardimg'>
                                                        <img width={40} height={40} src={require('../../assets/img/add.png')} alt='img' />
                                                    </div>
                                                    <p>اضافه اعلان</p>
                                                </article>
                                            </NavLink>
                                        </div>
                                    </div>

                                </div>

                            )}
                    </div>
                )
            }
            }
        </Context.Consumer>
        )
    }

}
export default Category;