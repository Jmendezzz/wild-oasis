import { Cabin } from '../interfaces/Cabin';
import supabase from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
}

export async function createCabin(cabin: Cabin){
  const imageName = `${Date.now()}-${cabin.image}`.replace("/","");
  //https://rooguivlderuvcpkzldr.supabase.co/storage/v1/object/sign/cabin-images/cabin-001.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDAxLmpwZyIsImlhdCI6MTcwNjAzMDAwNCwiZXhwIjoxNzA4NjIyMDA0fQ.F-5rmPtrx_59EHHHz48LeVOluLLK-TR1TkXBEeWKb2A&t=2024-01-23T17%3A13%3A26.745Z
  const imagePath = 
  const {data, error} = await supabase.from('cabins').insert([cabin]);
  if(error){
    throw new Error('Cabin could not be created');
  }
  return data;
}

export async function deleteCabin(id: number) {
  const {data, error} = await supabase.from('cabins').delete().eq('id', id);
  if(error){
    throw new Error('Cabin could not be deleted');
  }
  return data;
}
