import type { Product } from '@/api'
import { useParams } from '@solidjs/router'
import { Heart, Loader2, ShoppingCart } from 'lucide-solid'
import { Match, Switch, createResource } from 'solid-js'
import lightBulb from '/Simple_light_bulb_graphic.png'

export default function ProductPage() {
  const params = useParams<{ id: Product['id'] }>()
  const [data /* , { mutate, refetch } */] = createResource(
    params.id,
    id => {
      // todo: implement source
      const p: Product = {
        id: params.id,
        name: `Product name #${id}`,
        description: `Description of product ${id}`,
        price: Number.parseFloat((Math.random() * 100).toFixed(2)),
        currency_symbol: '$',
        weight_grams: Math.floor(Math.random() * 1000),
        image_url: lightBulb,
      }
      return p
    },
    {
      name: `resource:products:${params.id}`,
    }
  )

  return (
    <Switch>
      <Match when={data.loading}>
        <Loader2 size='70' class='m-auto animate-spin' />
      </Match>
      <Match when={data.error}>Error: {data.error}</Match>
      <Match when={1}>
        <div class='mx-5'>
          <div class='my-5 text-4xl'>{data()?.name}</div>
          <div class='flex'>
            <img
              class='basis-1/2 max-h-[50vh] object-contain'
              src={data()?.image_url}
              alt='Product Img'
            />
            <div class='basis-1/2 flex flex-col gap-y-2'>
              <div class='font-bold text-4xl'>
                {data()?.currency_symbol}
                {data()?.price}
              </div>
              <div class='font-medium '>{data()?.weight_grams} gram(s)</div>
              <div class='flex items-center gap-x-2'>
                <input
                  type='number'
                  class='w-14 h-10 border-2 border-gray-400 rounded'
                />
                <button type='button' class='p-1 bg-gray-300 rounded'>
                  <ShoppingCart class='inline-block' />
                  Add to Cart
                </button>
                <button type='button' class='p-1 bg-gray-300 rounded'>
                  <Heart />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Match>
    </Switch>
  )
}
