import { HiArrowRightOnRectangle } from "react-icons/hi2"
import ButtonIcon from "../../ui/ButtonIcon"
import { useLogout } from "./useLogout"
import { MouseEventHandler } from "react" 

function Logout() {
  const {logout, isLoading} = useLogout();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    logout(); // Call the logout function
  };

  return (
    <ButtonIcon disabled={isLoading} onClick={handleClick}> 
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  )
}

export default Logout