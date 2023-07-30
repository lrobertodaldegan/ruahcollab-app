
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'


const Icon = ({size=18, icon=faDotCircle, style={}}) => {
  return <FontAwesomeIcon size={size} style={[style]} 
              icon={icon} />
}

export default Icon;