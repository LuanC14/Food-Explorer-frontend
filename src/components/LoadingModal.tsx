import ReactLoading from 'react-loading';

interface LoadingModalProps {
    isLoading: boolean
}

export function LoadingModal( props: LoadingModalProps) {

    return (
        <div className={`max-h-screen overflow-hidden fixed z-50 inset-0 opacity-100 bg-dark-600 ${props.isLoading ? '' : 'hidden'}`}>

            <div className='relative top-1/2 left-1/2 ml-[-48px]'>
            <ReactLoading type={'spin'} color={'cyan'} height={70} width={70} />

            </div>
        </div>
    )
}