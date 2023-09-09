import React, { useState } from "react";
import { BsDashLg, BsPlusLg } from "react-icons/bs"
import styles from './FooterMobile.css'
import { FiArrowRight } from 'react-icons/fi'

interface footerProps {
    menuLayout : menuLayout[],
    signupText: string,
    connectText: string,
    placeholderText: string,
    menu4: menu[],
    socialImage : image[]
}
type menu = {
    label: string,
    href: string
}
type image = {
    carouselImage: string,
    href: string
}
type menuLayout = {
    menuTitle : string
    menuItems : menu[]
}

const FooterMobile: StorefrontFunctionComponent<footerProps> = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(Array(props.menuLayout.length).fill(false));
    
    const toggleMenu = (index: number) => {
        const updatedMenuState = [...isMenuOpen];
        updatedMenuState[index] = !updatedMenuState[index];
        setIsMenuOpen(updatedMenuState);
    }


   return (
        <footer className="pa4">
            <div className="bg-light-gray">
            {props.menuLayout?.map((menuLayoutItem, index) => {
                    return (
                        <div className="pt4 flex flex-wrap justify-between">
                            <div className="flex flex-column">
                                <div className={styles.menuHeader} onClick={() => toggleMenu(index)}>
                                    <a className="pt2 b ml4">{menuLayoutItem.menuTitle}</a>
                                    <span className={`${styles.addIcon} tr`}>{isMenuOpen[index] ? <BsDashLg /> : <BsPlusLg />}</span>
                                </div>
                                {isMenuOpen[index] && (
                                    <div className="w-25-l w-50-m w-100">
                                        <ul className={`${styles.listWrap}`}>
                                            <li className="mb2">
                                                {menuLayoutItem.menuItems?.map((menu: any, subIndex: number) => {
                                                    return (
                                                        <a key={subIndex} className={`${styles.menuItem} ml3 lh-copy`} href={menu.href}>
                                                            {menu.label}
                                                            {subIndex !== menuLayoutItem.menuItems.length - 1 && <br />}
                                                        </a>
                                                    )
                                                })}
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
                <div className="flex flex-wrap justify-between">
                    <div className="w-25-l w-50-m w-100">
                        <div className="pa2 ml3">
                            <h3 className="fw5 f4 measure-narrow">{props.signupText}</h3>
                        </div>
                        <div className={`${styles.newsletter}`}>
                            <form className={`${styles.inputForm} ml3`}>
                                <input type="text" placeholder={props.placeholderText} className={`pl5 mb3 w-90
                                    h2 ${styles.inputBox}`} />
                                    <span className={`tj ${styles.arrow}`}><FiArrowRight size={20} /></span>     
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className={`${styles.socialDiv} ml3`}> 
                        <h3 className="tr fw4 measure-narrow">{props.connectText}</h3>
                    </div>
                    <div className={`tr ${styles.socialIcons} ml3 mt2`}>
                        {props.socialImage?.map((simage: image, index: number) => {
                            return (
                                <span className="mr2" key={index} >
                                    <a className={`${styles.iconItem}`} href={simage.href}>
                                        <img src={`${simage.carouselImage}`} height="10px" width="10px" alt="links" />
                                    </a>
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className="mt6 pv4 flex flex-wrap justify-between">
                    <ul className={`${styles.listWrapper}`}>
                            {props.menu4?.map((menu: any, index: number) => {
                                return (
                                    <li key={index} className={`${styles.listItem}`}> 
                                        <a className="ml3 f6 lh-copy" href="#">{menu.label}</a>
                                    </li>
                                )
                            })}
                    </ul>
                </div>
            </div>
        </footer>
   )
}

FooterMobile.schema = {
    title: "Custom-mobile-footer",
    type: "object",
    properties: {
        menuLayout: {
            title: "Menu Layout",
            type: "array",
            items: {
              type: "object",
              properties: {
                menuTitle: {
                  type: "string",
                  title: "Enter menu Title",
                },
                menuItems: {
                  type: "array",
                  title: "List of sub menu",
                  items: {
                    type: "object",
                    properties: {
                      label: {
                        type: "string",
                        title: "Enter Label",
                      },
                      href: {
                        type: "string",
                        title: "Enter URL",
                      },
                    },
                  },
                },
              },
            },
        },
        signupText: {
            type: "string",
            title: "Enter Signup text"
        },
        connectText: {
            type: "string",
            title: "Enter Text for socialIcon"
        },
        socialImage: {
            title: "Image links",
            type: "object",
            items : {
                properties : {
                    carouselImage: {
                        title: "Social Icons Image",
                        type: "string",
                        widget: {
                            "ui:widget": "image-uploader",
                        },
                    },
                    href: {
                        title: "Enter URL",
                        type: "string"
                    }
                }
            }
        },
        placeholderText: {
            type: "string",
            title: "Enter placeholder"
        },
        menu4: {
            title: "Bottom row menu",
            type : "array",
            items : {
                properties : {
                    label: {
                        type: "string",
                        title: "Enter label for menu4"
                    },
                    href: {
                        type:"string",
                        title: "Enter href value"
                    }
                }
            }
        }
    }
}

export default FooterMobile