import React from 'react'
import styles from './FooterDesktop.css'
import { FiArrowRight } from 'react-icons/fi'

interface footerProps {
    menuLayout : menuLayout[]
    menu4: menu[],
    signupText: string,
    connectText: string,
    fbLink : string,
    instaLink : string,
    placeholderText: string,
    socialImage : image[]
}

type menu = {
    label: string,
    href: string
}

type menuLayout = {
    menuTitle : string
    menuItems : menu[]
}

type image = {
    carouselImage: string,
    href: string
}

const FooterDesktop: StorefrontFunctionComponent<footerProps> = (props) => {
    return (
        <footer className="pa4">
            <div className="bg-light-gray">
                <div className="flex flex-wrap justify-between">
                    {props.menuLayout?.map((menuLayoutItem, index) => {
                        return (
                            <div className="w-25-l w-50-m w-100" key={index}>
                                <ul className="list pl0">
                                    <li className="mb2 mt7">
                                        <p className="ml7 b ttc">{menuLayoutItem.menuTitle}</p>
                                    </li>
                                    <li className="mb2 ml7">
                                    {menuLayoutItem.menuItems?.map((menu, subIndex) => {
                                        return (
                                        <a 
                                            key={subIndex}
                                            className={`lh-copy ttc ${styles.menuItemd} `}
                                            href={menu.href}
                                        >
                                            {menu.label}
                                            {subIndex !== menuLayoutItem.menuItems.length - 1 && <br />}
                                        </a>
                                        );
                                    })}
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className="w-25-l w-50-m w-100">
                        <div className="pa2 ml7">
                            <h3 className="fw5 f4 measure-narrow">{props.signupText}</h3>
                        </div>
                        <div className={`${styles.newsletterd}`}>
                            <form className={`${styles.inputFormd} ml7`}>
                                <input type="text" placeholder={props.placeholderText} className={`pl5 mb3 w-75
                                    h2 ${styles.inputBoxd}`} />
                                    <span className={`tj ${styles.arrowd}`}><FiArrowRight size={20} /></span>     
                            </form>
                        </div>
                    </div>
                    <div className={`${styles.socialDiv} w-25-l w-50-m w-100`}>
                        <div className="pa2"> 
                            <h3 className="tr ml4 fw4 measure-narrow">{props.connectText}</h3>
                        </div>
                        <div className={`pt3 ml4 ${styles.socialIconsd}`}>
                            {props.socialImage?.map((simage: image, index: number) => {
                                return (
                                    <span>
                                        <a className={`${styles.iconItemd}`} href={simage.href} key={index}>
                                            <img src={`${simage.carouselImage}`} alt="links" />
                                        </a>
                                    </span>
                                )
                            })}
                        </div>
                        <div className="flex flex-wrap justify-between">
                            <ul className={`${styles.listWrapperd}`}>
                                    {props.menu4?.map((menu: any, index: number) => {
                                        return (
                                            <li key={index} className={`${styles.listItemd}`}>
                                                <a className="ml5 f6 lh-copy" href="#">{menu.label}</a>
                                            </li>
                                        )
                                    })}
                            </ul>
                        </div>
                    </div>
                </div>   
            </div>
        </footer>
    )
}
FooterDesktop.schema = {
    title: "custom-desktop-footer",
    type : "object",
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
            title: "Enter Text"
        },
        fbLink: {
            type: "string",
            title: "Enter Facebook Link "
        },
        instaLink: {
            type: "string",
            title: "Enter Instagram Link"
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
        },
        socialImage: {
            title: "Image links",
            type: "array",
            items : {
                type: "object",
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
        }
    }
}

export default FooterDesktop