import { default as ratio } from '../../ratio.js'

/**
 * Calculate the ratio
 */
export default function (){
    if( ratio.data.out > ratio.data.in )
        ratio.data.result = ( ratio.data.out - ratio.data.in ) / ratio.data.out * 100
    else
        ratio.data.result = ( ratio.data.out - ratio.data.in ) / ratio.data.in * 100
}
