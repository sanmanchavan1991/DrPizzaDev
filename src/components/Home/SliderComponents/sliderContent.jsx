
import { SlideT } from './slide'

export const SliderContent = (props) => {
  const { translate, transition, width, totalWidth } = props

  return (
    <div className="SliderContent"
    

      style={{
        transform: `translateX(-${translate}px)`
        , transition: `transform ease-out ${transition}s`
        , height: '100%'
        , width: `${totalWidth}px`
        , display: 'flex'
      }}
    >
      {
        props.slides && props.slides.map((slide, i) => (
          <SlideT width={width} key={slide + i} content={slide} />
        ))
      }
      {props.children}
    </div>
  )
}
