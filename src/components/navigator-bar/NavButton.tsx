interface navbuttonProps {
    title:string,
    clicked:Function,
    num:number
}
const NavButton = ({title, clicked, num} : navbuttonProps) =>{
    return <div>
        <button onClick={() =>clicked(num)}>{title}</button>
    </div>
}

export default NavButton