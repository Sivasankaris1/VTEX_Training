import React , { useState } from 'react'
import styles from './MegaMenuDesktop.css'
import { LiaAngleRightSolid } from 'react-icons/lia'
interface megaMenuProps {
    menuItem : menu[]
}
type menu = {
    label : string,
    href : string,
    submenus?: menu[]
}

const MegamenuDesktop: StorefrontFunctionComponent<megaMenuProps> = (props) => {
    const [menuActive,setMenuActive] = useState<string[]>([])

    const handleMouseEnter = (label:string) => {
        setMenuActive(prevMenuActive => [...prevMenuActive, label])
    }

    const handleMouseLeave = (label:string) => {
        setTimeout(() => {
            setMenuActive(prevMenuActive => prevMenuActive.filter(menuActive => menuActive !== label))
        }, 300)
    }

    const showSubmenu = (submenus: menu[] | undefined) => {
        if (!submenus) return null;
      
        return (
          <>
            {submenus.map((submenu: any, index: number) => (
                <>
                    <div className={`ml3  pa3 ${styles.submenuWrapperDesk}`} key={index}>
                        <div className={` ${styles.subMenuItemDesk}`}
                            onMouseEnter = {() => handleMouseEnter(submenu.label)}
                            onMouseLeave={() => handleMouseLeave(submenu.label)}
                        >
                            <a className="fw6 ml3 ttu">
                                {submenu.label}
                                <span className={`${styles.menuArrow}`}><LiaAngleRightSolid /></span>
                            </a>
                        </div>
                    </div>
                    <div className={`${styles.vl}`} key={`vl-${index}`}></div>
                    {menuActive.includes(submenu.label) && (
                        <div className={`${styles.childMenuContainer}`}>
                            {showChildMenu(submenu.submenus)}
                        </div>
                    )}
                </>
            ))}
          </>
        );
    };

    const showChildMenu = (submenus: menu[] | undefined) => {
        if (!submenus) return null;
        return (
            <div className={`${styles.childMenuWrapperDesk}`}>
                {submenus?.map((childmenu: any, index: number) => {
                    return (
                        <>
                            <ul className={`pa4 ${styles.list}`}
                                key={index}
                                onMouseEnter={() => handleMouseEnter(childmenu.label)}
                                onMouseLeave={() => handleMouseLeave(childmenu.label)}
                            >
                            <li className={`${styles.childMenu} ttc tl fw5 pl2`} key={index}>{childmenu.label}</li>
                            </ul>
                        {menuActive.includes(childmenu.label) && (
                            <div className={`flex flex-wrap flex-column ${styles.childMenuContainer}`}>
                                {showChildMenu(childmenu.submenus)}
                            </div>
                        )}
                        </>
                    )
                })}
            </div>
        )
    }

    return (
            <header className="pa4">
                <div className="flex flex-wrap justify-between bg-red">
                    <div className={`pl5 ml5 tj ${styles.topMenuListWrapperDesk} `}>
                        {props.menuItem?.map((menu: any, index: number) => {
                            return (
                                <div className={`pa4 ${styles.menuItemWrapperDesk}`} 
                                    onMouseEnter = {() => handleMouseEnter(menu.label)} 
                                    onMouseLeave={() => handleMouseLeave(menu.label)}
                                >
                                    <a key={index} className={` ttu ${styles.topMenuItemDesk}`} 
                                        href={menu.href}>
                                        {menu.label} </a>
                                        {/* {index !== menu.length - 1 && <br />} */}
                                        {menuActive.includes(menu.label) && (
                                            <div className={`${styles.submenuContainer}`}>
                                            {showSubmenu(menu.submenus)}
                                            </div>
                                        )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </header>
    )
}
MegamenuDesktop.schema = {
    title: "Custom Megamenu Desktop",
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

export default MegamenuDesktop