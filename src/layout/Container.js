
// eslint-disable-next-line no-unused-vars
import styles from './Container.module.css'

function Container(props) {
    return (
        // eslint-disable-next-line no-template-curly-in-string
        <div className= {'${styles.container} ${styles[props.customClass]}'}>
            {props.children}
        </div>
    )
}

export default Container