

export const SlideT = (props) => {

   return (
    <div

      style={{
        backgroundImage: `url(${props.content})`
        , height: '80%'
        , width: `${props.width}px`
        , backgroundSize: 'cover'
        , backgroundRepeat: 'no-repeat'
        , backgroundPosition: 'center'
        , backgroundColor: "red"
      }}
    ></div>
  )
}