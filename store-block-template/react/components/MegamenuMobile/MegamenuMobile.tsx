import React,{  useState } from "react";
import styles from './MegamenuMobile.css'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { RxMinus } from 'react-icons/rx'
interface megaMenuProps {
    menuItem : menu[]
}
type menu = {
    label : string,
    href : string,
    submenus?: menu[]
}

const MegamenuMobile: StorefrontFunctionComponent<megaMenuProps> = (props) => {
    const [menuOpen,setMenuOpen] = useState<string[]>([])
     
    const toggleSubMenu = (id: string) => {
        setMenuOpen((prevMenuOpen) => {
          if (prevMenuOpen.includes(id)) {
            return prevMenuOpen.filter((menu) => menu !== id);
          } else {
            return [...prevMenuOpen, id];
          }
        });
    };

    const slicedMenuOpen = menuOpen.map((menu) => {
        const parts = menu.split('-');
        return parts.length > 1 ? parts[1] : ''; 
    });

    const handleMenuClick = (menuItem: menu) => {
        if (menuItem?.submenus) {
            toggleSubMenu(menuItem?.label)
        }
    }
    const handleSubMenuClick = (label: string) => {
        toggleSubMenu(label)
    }

    const renderSubMenu = (subMenuItems: menu[], parentMenu: string) => {
        return (
            <>
                <ul className={`${styles.subMenuWrapper} list pl0 mt2`}>
                    {subMenuItems?.map((item:any,index:number) => {
                        return (
                            <React.Fragment key={index}>
                            <li className={`mb3 ttu bb fw7 ${styles.submenuList} `} 
                                key={index}
                                onClick={() => toggleSubMenu(`${parentMenu}-${item?.label}`)}
                            >
                                <p className={`subItem ${
                                        slicedMenuOpen?.includes(item?.label) ? 'red' : ''}`}>{item?.label}
                                    {item?.submenus && (
                                        <span className={`${styles.menuAngleArrow}`}>
                                            {slicedMenuOpen.includes(item?.label) ? (
                                                <span><RxMinus /></span>
                                            ) : (
                                                <span><RiArrowRightSLine /></span>
                                            )}
                                        </span>
                                    )}
                                </p>
                                     {menuOpen?.includes(`${parentMenu}-${item?.label}`) && item?.submenus && (
                                        <ul className={`${styles.subMenuWrapper} list pl0`}>
                                            {item?.submenus?.map((subItem:any) => (
                                            <li key={subItem?.text} className={`pa4 bb ${styles.subItemList}`}>
                                                <span
                                                className={`ttu fw6 ${styles.childmenuLabel}`}
                                                onClick={() => handleSubMenuClick(subItem?.label)}
                                                >
                                                {subItem?.label}
                                                </span>
                                            </li>
                                            ))}
                                        </ul>
                                    )}
                            </li>
                            </React.Fragment>
                        )
                    })}
                </ul>
            </>
        )
    }

    return (
        <header className="pa4">
            <div className={`${styles.menuContainer}`}>
                <div className="flex flex-column flex-wrap">
                    {props.menuItem?.map((menu: any, index: number) => {
                        return (
                            <React.Fragment key={index}>
                                {menuOpen?.includes(menu?.label) ? 
                                     (<a href="/" className="prevLink">
                                        <span className={`fw6 `}>
                                            <RiArrowLeftSLine /> 
                                            <span className={`${styles.prevNav}`} >Go Back</span>
                                        </span>
                                        </a> )
                                : '' }
                                <p 
                                 className={`tl ttu bb fw6 pl2 ${
                                    menuOpen?.includes(menu?.label) ? 'red' : ''}`} 
                                    key={index} 
                                    onClick={() => handleMenuClick(menu)} >
                                    {menu?.label}
                                    {menu?.submenus && (
                                        <span className={`${styles.menuAngleArrow}`}>
                                            {menuOpen.includes(menu?.label) ? (
                                                <span><RxMinus /></span>
                                            ) : (
                                                <span><RiArrowRightSLine /></span>
                                            )}
                                        </span>
                                    )}
                                </p>
                                {menuOpen?.includes(menu?.label) &&
                                    menu?.submenus &&
                                    renderSubMenu(menu?.submenus, menu?.label)}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </header>
    )
}

MegamenuMobile.schema = {
    title: "Custom Megamenu Mobile",
    type : "object",
    properties: {
        menuItem: {
            type: "array",
            title: "Top menu ",
            items : {
                type: "object",
                properties : {
                    label: {
                        type: "string",
                        title: "Enter label for top menu"
                    },
                    href: {
                        type:"string",
                        title: "Enter href value for top menu"
                    },
                    submenus: {
                        type: "array",
                        title: "Submenu List",
                        items: {
                            type: "object",
                            properties: {
                                label: {
                                    title: "Enter label for Sub menu",
                                    type: "string"
                                },
                                href: {
                                    title: "Enter url for Sub menu",
                                    type: "string"
                                },
                                submenus: {
                                    type: "array",
                                    title: "Submenu - child List",
                                    items: {
                                        type: "object",
                                        properties: {
                                            label: {
                                                title: "Enter label for child menu",
                                                type: "string"
                                            },
                                            href: {
                                                title: "Enter url for child menu",
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
export default MegamenuMobile