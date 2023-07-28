<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->getTranslations('name'),
            'image' => $this->image,
            'images' => $this->images,
            'price' => $this->price,
            'duration' => $this->getTranslations('duration'),
            'description1' => $this->getTranslations('description1'),
            'description2' => $this->getTranslations('description2'),
            'included' => $this->getTranslations('included'),
            'material' => $this->getTranslations('material'),
        ];
    }
}
